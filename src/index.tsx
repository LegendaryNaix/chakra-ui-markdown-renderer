import React from 'react';
import deepmerge from 'deepmerge';
import { Components } from 'react-markdown';
import {
  Code,
  Divider,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { Checkbox } from '@chakra-ui/checkbox';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { chakra } from '@chakra-ui/system';

type GetCoreProps = {
  children?: React.ReactNode;
  'data-sourcepos'?: any;
};

function getCoreProps(props: GetCoreProps): any {
  return props['data-sourcepos']
    ? { 'data-sourcepos': props['data-sourcepos'] }
    : {};
}

interface Defaults extends Components {
  /**
   * @deprecated Use `h1, h2, h3, h4, h5, h6` instead.
   */
  heading?: Components['h1'];
}

export const defaults = {
  p: ({ children }: { children: React.ReactNode }) => {
    return <Text mb={2}>{children}</Text>;
  },
  em: ({ children }: { children: React.ReactNode }) => {
    return <Text as="em">{children}</Text>;
  },
  blockquote: ({ children }: { children: React.ReactNode }) => {
    return (
      <Code as="blockquote" p={2}>
        {children}
      </Code>
    );
  },
  code: ({
    children,
    inline,
    className,
  }: {
    children: React.ReactNode;
    inline: boolean;
    className: string;
  }) => {
    if (inline) {
      return <Code p={2}>{children}</Code>;
    }

    return (
      <Code
        className={className}
        whiteSpace="break-spaces"
        display="block"
        w="full"
        p={2}
      >
        {children}
      </Code>
    );
  },
  del: ({ children }: { children: React.ReactNode }) => {
    return <Text as="del">{children}</Text>;
  },
  hr: () => {
    return <Divider />;
  },
  a: Link,
  img: Image,
  text: ({ children }: { children: React.ReactNode }) => {
    return <Text as="span">{children}</Text>;
  },
  ul: (props: {
    children: React.ReactNode;
    ordered: boolean;
    depth: number;
  }) => {
    const { ordered, children, depth } = props;
    const attrs = getCoreProps(props);
    let Element = UnorderedList;
    let styleType = 'disc';
    if (ordered) {
      Element = OrderedList;
      styleType = 'decimal';
    }
    if (depth === 1) styleType = 'circle';
    return (
      <Element
        spacing={2}
        as={ordered ? 'ol' : 'ul'}
        styleType={styleType}
        pl={4}
        {...attrs}
      >
        {children}
      </Element>
    );
  },
  ol: (props: {
    children: React.ReactNode;
    ordered: boolean;
    depth: number;
  }) => {
    const { ordered, children, depth } = props;
    const attrs = getCoreProps(props);
    let Element = UnorderedList;
    let styleType = 'disc';
    if (ordered) {
      Element = OrderedList;
      styleType = 'decimal';
    }
    if (depth === 1) styleType = 'circle';
    return (
      <Element
        spacing={2}
        as={ordered ? 'ol' : 'ul'}
        styleType={styleType}
        pl={4}
        {...attrs}
      >
        {children}
      </Element>
    );
  },
  li: (props: { children: React.ReactNode; checked: boolean }) => {
    const { children, checked } = props;
    let checkbox = null;

    if (checked !== null && checked !== undefined) {
      checkbox = (
        <Checkbox isChecked={checked} isReadOnly>
          {/* wtf why did you slice the children */}
          {children}
        </Checkbox>
      );
    }

    return (
      <ListItem
        {...getCoreProps(props)}
        listStyleType={checked !== null ? 'none' : 'inherit'}
      >
        {checkbox || children}
      </ListItem>
    );
  },
  heading: (props: { children: React.ReactNode; level: number }) => {
    const { level, children } = props;
    const sizes = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
    return (
      <Heading
        my={4}
        as={`h${level}`}
        size={sizes[`${level - 1}`]}
        {...getCoreProps(props)}
      >
        {children}
      </Heading>
    );
  },
  pre: (props: { children: React.ReactNode }) => {
    const { children } = props;
    return <chakra.pre {...getCoreProps(props)}>{children}</chakra.pre>;
  },
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: ({ children }: { children: React.ReactNode }) => <Tr>{children}</Tr>,
  td: ({ children }: { children: React.ReactNode }) => <Td>{children}</Td>,
  th: ({ children }: { children: React.ReactNode }) => <Th>{children}</Th>,
} as unknown as Defaults;

function ChakraUIRenderer(theme?: Defaults, merge = true): Components {
  const elements = {
    p: defaults.p,
    em: defaults.em,
    blockquote: defaults.blockquote,
    code: defaults.code,
    del: defaults.del,
    hr: defaults.hr,
    a: defaults.a,
    img: defaults.img,
    text: defaults.text,
    ul: defaults.ul,
    ol: defaults.ol,
    li: defaults.li,
    h1: defaults.heading,
    h2: defaults.heading,
    h3: defaults.heading,
    h4: defaults.heading,
    h5: defaults.heading,
    h6: defaults.heading,
    pre: defaults.pre,
    table: defaults.table,
    thead: defaults.thead,
    tbody: defaults.tbody,
    tr: defaults.tr,
    td: defaults.td,
    th: defaults.th,
  };

  if (theme && merge) {
    return deepmerge(elements, theme);
  }

  return elements;
}

export default ChakraUIRenderer;
