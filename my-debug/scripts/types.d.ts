interface Schema {
  option: Option;
}

interface Option {
  type: "Object";
  properties: Properties;
}

interface Properties {
  [Field: string]: Property;
}

interface Property {
  type: string[] | string;
  description: string;
  default?: string | boolean | number | null;
  properties?: Properties;
}
