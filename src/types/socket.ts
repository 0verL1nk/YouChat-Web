export interface ChatMsg {
    From: string
    To: string
    Type: 'text' | 'image' | 'audio' | 'video' | 'file'
    // 2000成功,5000失败
    Code: 2000 | 5000
    // image,audio,video,file都是先上传然后转为url,video需要
    Content: string | ChatMsgImage | ChatMsgAudio | ChatMsgVideo | ChatMsgFile
    // Unix时间戳
    CreateAt: EpochTimeStamp
}

interface ChatMsgImage {
    ImageName: string
    Url: string
    // base64 ,缩略图
    Compressed: string
}

interface ChatMsgAudio {
    AudioName: string
    Url: string
    // day:hour:minute:second
    Length: string
}
interface ChatMsgVideo {
    VideoName: string
    Url: string
    // base64缩略图
    Cover: string
    // day:hour:minute:second
    Length: string
}

interface ChatMsgFile {
    Url: string
    FileName: string
    FileType: 'pdf' | 'word' | 'exe' | 'txt' | 'others'
    FileSize: string
}