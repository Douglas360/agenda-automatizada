interface FileObject {
  originalname: string;
  buffer: Buffer;
  path: string;
}

export interface IEventCreate {
  name: string;
  description?: string;
  date: Date;
  file?: FileObject;
  folderName?: string;
  ministryId: number;
  user_id: number;
}

export interface IEventeDelete {
  id: number;
  user_id: number;
  isAdmin: boolean;
}
