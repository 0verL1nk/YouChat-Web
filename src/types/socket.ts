export interface ChatMsg {
  id: string
  from: string
  to: string
  type: MsgType
  // 2000成功,5000失败
  code: number
  // image,audio,video,file都是先上传然后转为url,video需要
  Content: ChatMsgText | ChatMsgImage | ChatMsgAudio | ChatMsgVideo | ChatMsgFile
  // Unix时间戳
  create_at: EpochTimeStamp
}
export enum MsgType {
  'text',
  'image',
  'audio',
  'video',
  'file',
}

export interface ChatMsgText {
  Text: string
}

export interface ChatMsgImage {
  ImageName: string
  Url: string
  // base64 ,缩略图
  Compressed: string
}

export interface ChatMsgAudio {
  AudioName: string
  Url: string
  // day:hour:minute:second
  Length: string
}
export interface ChatMsgVideo {
  VideoName: string
  Url: string
  // base64缩略图
  Cover: string
  // day:hour:minute:second
  Length: string
}

export interface ChatMsgFile {
  Url: string
  FileName: string
  FileType: 'pdf' | 'word' | 'exe' | 'txt' | 'others'
  FileSize: string
}
