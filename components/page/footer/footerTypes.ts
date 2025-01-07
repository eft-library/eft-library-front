interface Icon {
  link: string;
  name: string;
}

interface FooterColumn {
  id: string;
  json_value: FooterJsonValue;
  type: string;
}

interface FooterJsonValue {
  icon: Icon[];
  text: Text[];
}

interface Text {
  value: string;
}
export interface FooterData {
  footerData: FooterColumn;
}
