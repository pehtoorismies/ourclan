import React from 'react';
import { Text, Flex, Box, Image } from 'rebass';
import uuidv4 from 'uuid/v4';
import { mapIndexed } from 'ramda-adjunct';
import * as R from 'ramda';
import { graphql } from 'gatsby';
import createDompurify from 'dompurify';
import styled from 'styled-components';
import LayoutContainer from '../containers/LayoutContainer';

const MaxHeightImg = styled(Image)`
  max-height: 400px;
`;

const createMarkup = d => {
  if (typeof window !== 'undefined') {
    const dp = createDompurify(window);
    return { __html: dp.sanitize(d) };
  }
  return { __html: d };
};

const parse = data => {
  const blocks = R.path(['prismicFrontPage', 'data', 'contentblock'], data);

  return R.map(
    b => ({
      title: b.title.text,
      description: b.description.html,
      imageUrl: b.image.url,
    }),
    blocks,
  );
};

const renderBlock = (block, idx) => {
  const uuid = uuidv4();
  const { title, description, imageUrl } = block;
  const isEven = idx % 2 === 0;
  const bgColor = isEven ? 'gray' : '';
  const descriptionContent = (
    <Flex width={[1, 1, 1 / 2]} alignItems="center" key={`d_${uuid}`}>
      <Text
        px={3}
        py={1}
        color="black"
        fontWeight="normal"
        textAlign="center"
        lineHeight={[1, 2]}
      >
        <div dangerouslySetInnerHTML={createMarkup(description)} />
      </Text>
    </Flex>
  );
  const imageContent = (
    <Flex
      width={[1, 1, 1 / 2]}
      alignItems="center"
      justifyContent="center"
      key={`i_${uuid}`}
    >
      <MaxHeightImg src={imageUrl} p={2} />
    </Flex>
  );

  const contentArray = isEven
    ? [descriptionContent, imageContent]
    : [imageContent, descriptionContent];

  return (
    <Box bg={bgColor} py={3} key={uuid}>
      <Text
        color="black"
        textAlign="center"
        fontSize={2}
        fontWeight="bold"
        p={3}
      >
        {title}
      </Text>
      <Flex flexWrap="wrap">{R.flatten(contentArray)}</Flex>
    </Box>
  );
};

const IndexPage = ({ data }) => {
  // eslint-disable-line
  const contentblocks = parse(data);
  return (
    <LayoutContainer>{mapIndexed(renderBlock, contentblocks)}</LayoutContainer>
  );
};

export const query = graphql`
  query HomePageQuery {
    prismicFrontPage {
      id
      data {
        contentblock {
          title {
            text
          }
          description {
            html
          }
          image {
            url
            dimensions {
              width
              height
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
