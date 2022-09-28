declare module '*.png';
declare module '*.jpg';

type StatusInterface = 'success' | 'info' | 'warning' | 'error';

interface Pages {
  pageId?: string;
  pageUrl?: string;
}

interface Hit {
  pageId: string;
  requestType: string;
  data: QueryString[];
}

interface QueryString {
  name: string;
  value: string;
  comment?: string | undefined;
}

interface PenguinMessage {
  schema: Record<string, string>;
  parametersObj: Record<string, string>;
}

interface ValidationResultInterface {
  status: StatusInterface;
  message: string;
  dataLayerObject: any;
  objectName: any;
  keyName: any;
  partialError: any;
}

interface HitAccordionProps {
  hitParameters: Record<string, string>;
  contentTitle: string;
  hitTypeIcon: string;
  key: number;
  removeHit?: Function;
  validationStatus: string;
  validationResult: string | undefined;
}
