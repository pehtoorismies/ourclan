import React from 'react';
import { Text, Flex, Box, Image } from 'rebass';
import styled from 'styled-components';
import talo from '../images/talo.jpg';
import Layout from '../components/Layout';
import vaakuna from '../images/vaakuna.png';

const MaxHeightImg = styled(Image)`
  max-height: 400px;
`;

const IndexPage = () => (
  <Layout>
    <Box py={3}>
      <Text
        color="black"
        textAlign="center"
        fontSize={2}
        fontWeight="bold"
        p={3}
      >
        Suku
      </Text>
      <Flex flexWrap="wrap">
        <Flex width={[1, 1, 1 / 2]} alignItems="center">
          <Text
            px={3}
            py={1}
            color="black"
            fontWeight="normal"
            textAlign="center"
            lineHeight={[1, 2]}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            elementum, diam vel ullamcorper sollicitudin, metus eros fringilla
            ipsum, euismod aliquet turpis nisl a erat. Aliquam et felis lectus.
            Cras sollicitudin et sem et efficitur. Nam molestie rutrum
            sollicitudin. Quisque ullamcorper arcu eget ultricies semper. Fusce
            quis orci elementum justo tempor aliquet dignissim vel ligula.
            Maecenas semper ultricies massa quis porta. Vivamus fringilla, nisl
            et tincidunt venenatis, risus sem dapibus metus, ac semper nisl quam
            at urna. Donec imperdiet nunc metus, id luctus lectus suscipit nec.
            Etiam nulla arcu, pulvinar id risus vel, bibendum cursus felis.
            Quisque enim quam, placerat malesuada elit at, ultrices laoreet
            elit. Fusce semper sit amet nisi vel pellentesque. Donec diam
            sapien, sagittis id hendrerit id, bibendum id ipsum. Quisque feugiat
            orci sit amet diam fringilla, eget porta metus gravida.
          </Text>
        </Flex>
        <Flex width={[1, 1, 1 / 2]} alignItems="center" justifyContent="center">
          <Image src={talo} p={2} />
        </Flex>
      </Flex>
    </Box>

    <Box bg="gray" py={3}>
      <Text
        color="black"
        textAlign="center"
        fontSize={2}
        fontWeight="bold"
        p={3}
      >
        Vaakuna
      </Text>
      <Flex flexWrap="wrap">
        <Flex width={[1, 1, 1 / 2]} alignItems="center" justifyContent="center">
          <MaxHeightImg src={vaakuna} p={2} />
        </Flex>
        <Flex width={[1, 1, 1 / 2]} alignItems="center">
          <Text
            px={3}
            py={1}
            color="black"
            fontWeight="normal"
            textAlign="center"
            lineHeight={[1, 2]}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            elementum, diam vel ullamcorper sollicitudin, metus eros fringilla
            ipsum, euismod aliquet turpis nisl a erat. Aliquam et felis lectus.
            Cras sollicitudin et sem et efficitur. Nam molestie rutrum
            sollicitudin. Quisque ullamcorper arcu eget ultricies semper. Fusce
            quis orci elementum justo tempor aliquet dignissim vel ligula.
            Maecenas semper ultricies massa quis porta. Vivamus fringilla, nisl
            et
          </Text>
        </Flex>
      </Flex>
    </Box>
  </Layout>
);

export default IndexPage;
