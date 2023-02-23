declare module '*.png';
declare module '*.jpg';

type StatusInterface = 'success' | 'info' | 'warning' | 'error';
interface Page {
  pageId: string;
  pageUrl: string;
  expanded: boolean;
  favIconUrl: string;
  hits: Hit[];
  framesDocumentId?: string[];
  documentId?: string;
}

interface Hit {
  pageId: string;
  hitId: string;
  hitParameters: { [key: string]: string };
  contentTitle: string;
  hitType: string;
  eventType: string;
  expanded: boolean;
}

interface ExtendedGetAllFrameResultDetails
  extends chrome.webNavigation.GetAllFrameResultDetails {
  documentId: string;
  frameType: string;
}

interface ExtendedWebRequestBodyDetails
  extends chrome.webRequest.WebRequestBodyDetails {
  documentId: string;
}

interface ExtendedWebNavigationTransitionCallbackDetails
  extends chrome.webNavigation.WebNavigationTransitionCallbackDetails {
  documentId: string;
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
