declare namespace Imessage {
  export interface IlistMessage {
    notifications: Notification[];
  }

  export interface Notification {
    _id: string;
    message: string;
    read: boolean;
    createdBy: string;
    createdAt: string;
    __v: number;
  }
}
