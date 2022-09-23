declare module '*.png';
declare module '*.jpg';

type StatusInterface = 'success' | 'info' | 'warning' | 'error';
interface QueryString {
  name: string;
  value: string;
  comment?: string | undefined;
}

interface HitList {
  hitParameters: Record<string, string>;
  validationStatus: StatusInterface;
  validationResult: any;
  contentTitle: string;
  hitType: string;
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
