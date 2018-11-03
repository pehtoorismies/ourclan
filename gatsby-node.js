const path = require(`path`);

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/jasenet/)) {
    // page.matchPath = `/jasenet/*`;

    // Update the page.
    createPage({
      ...page,
      matchPath: `/jasenet/*`,
    });
  }
};

// You can delete this file if you're not using it
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const albumTemplate = path.resolve(`src/templates/album.js`);
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `
          {
            allPrismicAlbum(limit: 1000) {
              edges {
                node {
                  id
                  uid
                }
              }
            }
          }
        `,
      ).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        // Create blog post pages.
        result.data.allPrismicAlbum.edges.forEach(edge => {
          console.log('edge.....', edge.node.uid);
          createPage({
            path: `albumi/${edge.node.uid}`, // required
            component: albumTemplate,
            context: {
              slug: edge.node.uid,
              // Add optional context data. Data can be used as
              // arguments to the page GraphQL query.
              //
              // The page "path" is always available as a GraphQL
              // argument.
            },
          });
        });
      }),
    );
  });
};
