export const enum MessageType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  FILE = "FILE",
  SYSTEM = "SYSTEM",
}

export const encodeMessageType: { [key: string]: number } = {
  TEXT: 0,
  IMAGE: 1,
  FILE: 2,
  SYSTEM: 3,
};

export const decodeMessageType: { [key: number]: MessageType } = {
  0: MessageType.TEXT,
  1: MessageType.IMAGE,
  2: MessageType.FILE,
  3: MessageType.SYSTEM,
};

export const enum msgType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
  FILE = "FILE",
}

export const encodemsgType: { [key: string]: number } = {
  TEXT: 0,
  IMAGE: 1,
  AUDIO: 2,
  VIDEO: 3,
  FILE: 4,
};

export const decodemsgType: { [key: number]: msgType } = {
  0: msgType.TEXT,
  1: msgType.IMAGE,
  2: msgType.AUDIO,
  3: msgType.VIDEO,
  4: msgType.FILE,
};

export interface ChatMsgImage {
  image_name?: string;
  url?: string;
  compressed?: string;
}

export function encodeChatMsgImage(message: ChatMsgImage): Uint8Array {
  let bb = popByteBuffer();
  _encodeChatMsgImage(message, bb);
  return toUint8Array(bb);
}

function _encodeChatMsgImage(message: ChatMsgImage, bb: ByteBuffer): void {
  // optional string image_name = 1;
  let $image_name = message.image_name;
  if ($image_name !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $image_name);
  }

  // optional string url = 2;
  let $url = message.url;
  if ($url !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $url);
  }

  // optional string compressed = 3;
  let $compressed = message.compressed;
  if ($compressed !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $compressed);
  }
}

export function decodeChatMsgImage(binary: Uint8Array): ChatMsgImage {
  return _decodeChatMsgImage(wrapByteBuffer(binary));
}

function _decodeChatMsgImage(bb: ByteBuffer): ChatMsgImage {
  let message: ChatMsgImage = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string image_name = 1;
      case 1: {
        message.image_name = readString(bb, readVarint32(bb));
        break;
      }

      // optional string url = 2;
      case 2: {
        message.url = readString(bb, readVarint32(bb));
        break;
      }

      // optional string compressed = 3;
      case 3: {
        message.compressed = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ChatMsgAudio {
  audio_name?: string;
  url?: string;
  length?: string;
}

export function encodeChatMsgAudio(message: ChatMsgAudio): Uint8Array {
  let bb = popByteBuffer();
  _encodeChatMsgAudio(message, bb);
  return toUint8Array(bb);
}

function _encodeChatMsgAudio(message: ChatMsgAudio, bb: ByteBuffer): void {
  // optional string audio_name = 1;
  let $audio_name = message.audio_name;
  if ($audio_name !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $audio_name);
  }

  // optional string url = 2;
  let $url = message.url;
  if ($url !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $url);
  }

  // optional string length = 3;
  let $length = message.length;
  if ($length !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $length);
  }
}

export function decodeChatMsgAudio(binary: Uint8Array): ChatMsgAudio {
  return _decodeChatMsgAudio(wrapByteBuffer(binary));
}

function _decodeChatMsgAudio(bb: ByteBuffer): ChatMsgAudio {
  let message: ChatMsgAudio = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string audio_name = 1;
      case 1: {
        message.audio_name = readString(bb, readVarint32(bb));
        break;
      }

      // optional string url = 2;
      case 2: {
        message.url = readString(bb, readVarint32(bb));
        break;
      }

      // optional string length = 3;
      case 3: {
        message.length = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ChatMsgVideo {
  video_name?: string;
  url?: string;
  cover?: string;
  length?: string;
}

export function encodeChatMsgVideo(message: ChatMsgVideo): Uint8Array {
  let bb = popByteBuffer();
  _encodeChatMsgVideo(message, bb);
  return toUint8Array(bb);
}

function _encodeChatMsgVideo(message: ChatMsgVideo, bb: ByteBuffer): void {
  // optional string video_name = 1;
  let $video_name = message.video_name;
  if ($video_name !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $video_name);
  }

  // optional string url = 2;
  let $url = message.url;
  if ($url !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $url);
  }

  // optional string cover = 3;
  let $cover = message.cover;
  if ($cover !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $cover);
  }

  // optional string length = 4;
  let $length = message.length;
  if ($length !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $length);
  }
}

export function decodeChatMsgVideo(binary: Uint8Array): ChatMsgVideo {
  return _decodeChatMsgVideo(wrapByteBuffer(binary));
}

function _decodeChatMsgVideo(bb: ByteBuffer): ChatMsgVideo {
  let message: ChatMsgVideo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string video_name = 1;
      case 1: {
        message.video_name = readString(bb, readVarint32(bb));
        break;
      }

      // optional string url = 2;
      case 2: {
        message.url = readString(bb, readVarint32(bb));
        break;
      }

      // optional string cover = 3;
      case 3: {
        message.cover = readString(bb, readVarint32(bb));
        break;
      }

      // optional string length = 4;
      case 4: {
        message.length = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ChatMsgFile {
  url?: string;
  file_name?: string;
  file_type?: FileType;
  file_size?: string;
}

export function encodeChatMsgFile(message: ChatMsgFile): Uint8Array {
  let bb = popByteBuffer();
  _encodeChatMsgFile(message, bb);
  return toUint8Array(bb);
}

function _encodeChatMsgFile(message: ChatMsgFile, bb: ByteBuffer): void {
  // optional string url = 1;
  let $url = message.url;
  if ($url !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $url);
  }

  // optional string file_name = 2;
  let $file_name = message.file_name;
  if ($file_name !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $file_name);
  }

  // optional FileType file_type = 3;
  let $file_type = message.file_type;
  if ($file_type !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeFileType($file_type, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string file_size = 4;
  let $file_size = message.file_size;
  if ($file_size !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $file_size);
  }
}

export function decodeChatMsgFile(binary: Uint8Array): ChatMsgFile {
  return _decodeChatMsgFile(wrapByteBuffer(binary));
}

function _decodeChatMsgFile(bb: ByteBuffer): ChatMsgFile {
  let message: ChatMsgFile = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string url = 1;
      case 1: {
        message.url = readString(bb, readVarint32(bb));
        break;
      }

      // optional string file_name = 2;
      case 2: {
        message.file_name = readString(bb, readVarint32(bb));
        break;
      }

      // optional FileType file_type = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.file_type = _decodeFileType(bb);
        bb.limit = limit;
        break;
      }

      // optional string file_size = 4;
      case 4: {
        message.file_size = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ChatMsg {
  id?: string;
  from?: string;
  to?: string;
  type?: msgType;
  code?: number;
  created_at?: Long;
  text?: string;
  image?: ChatMsgImage;
  audio?: ChatMsgAudio;
  video?: ChatMsgVideo;
  file?: ChatMsgFile;
}

export function encodeChatMsg(message: ChatMsg): Uint8Array {
  let bb = popByteBuffer();
  _encodeChatMsg(message, bb);
  return toUint8Array(bb);
}

function _encodeChatMsg(message: ChatMsg, bb: ByteBuffer): void {
  // optional string id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $id);
  }

  // optional string from = 2;
  let $from = message.from;
  if ($from !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $from);
  }

  // optional string to = 3;
  let $to = message.to;
  if ($to !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $to);
  }

  // optional msgType type = 4;
  let $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 32);
    writeVarint32(bb, encodemsgType[$type]);
  }

  // optional int32 code = 5;
  let $code = message.code;
  if ($code !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($code));
  }

  // optional int64 created_at = 6;
  let $created_at = message.created_at;
  if ($created_at !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $created_at);
  }

  // optional string text = 7;
  let $text = message.text;
  if ($text !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $text);
  }

  // optional ChatMsgImage image = 8;
  let $image = message.image;
  if ($image !== undefined) {
    writeVarint32(bb, 66);
    let nested = popByteBuffer();
    _encodeChatMsgImage($image, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ChatMsgAudio audio = 9;
  let $audio = message.audio;
  if ($audio !== undefined) {
    writeVarint32(bb, 74);
    let nested = popByteBuffer();
    _encodeChatMsgAudio($audio, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ChatMsgVideo video = 10;
  let $video = message.video;
  if ($video !== undefined) {
    writeVarint32(bb, 82);
    let nested = popByteBuffer();
    _encodeChatMsgVideo($video, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ChatMsgFile file = 11;
  let $file = message.file;
  if ($file !== undefined) {
    writeVarint32(bb, 90);
    let nested = popByteBuffer();
    _encodeChatMsgFile($file, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeChatMsg(binary: Uint8Array): ChatMsg {
  return _decodeChatMsg(wrapByteBuffer(binary));
}

function _decodeChatMsg(bb: ByteBuffer): ChatMsg {
  let message: ChatMsg = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string id = 1;
      case 1: {
        message.id = readString(bb, readVarint32(bb));
        break;
      }

      // optional string from = 2;
      case 2: {
        message.from = readString(bb, readVarint32(bb));
        break;
      }

      // optional string to = 3;
      case 3: {
        message.to = readString(bb, readVarint32(bb));
        break;
      }

      // optional msgType type = 4;
      case 4: {
        message.type = decodemsgType[readVarint32(bb)];
        break;
      }

      // optional int32 code = 5;
      case 5: {
        message.code = readVarint32(bb);
        break;
      }

      // optional int64 created_at = 6;
      case 6: {
        message.created_at = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional string text = 7;
      case 7: {
        message.text = readString(bb, readVarint32(bb));
        break;
      }

      // optional ChatMsgImage image = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        message.image = _decodeChatMsgImage(bb);
        bb.limit = limit;
        break;
      }

      // optional ChatMsgAudio audio = 9;
      case 9: {
        let limit = pushTemporaryLength(bb);
        message.audio = _decodeChatMsgAudio(bb);
        bb.limit = limit;
        break;
      }

      // optional ChatMsgVideo video = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        message.video = _decodeChatMsgVideo(bb);
        bb.limit = limit;
        break;
      }

      // optional ChatMsgFile file = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        message.file = _decodeChatMsgFile(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GetConversationReq {
  GroupID?: string;
  After?: Long;
  Page?: Long;
  PageSize?: Long;
}

export function encodeGetConversationReq(message: GetConversationReq): Uint8Array {
  let bb = popByteBuffer();
  _encodeGetConversationReq(message, bb);
  return toUint8Array(bb);
}

function _encodeGetConversationReq(message: GetConversationReq, bb: ByteBuffer): void {
  // optional string GroupID = 1;
  let $GroupID = message.GroupID;
  if ($GroupID !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $GroupID);
  }

  // optional int64 After = 2;
  let $After = message.After;
  if ($After !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $After);
  }

  // optional int64 Page = 3;
  let $Page = message.Page;
  if ($Page !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $Page);
  }

  // optional int64 PageSize = 4;
  let $PageSize = message.PageSize;
  if ($PageSize !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $PageSize);
  }
}

export function decodeGetConversationReq(binary: Uint8Array): GetConversationReq {
  return _decodeGetConversationReq(wrapByteBuffer(binary));
}

function _decodeGetConversationReq(bb: ByteBuffer): GetConversationReq {
  let message: GetConversationReq = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string GroupID = 1;
      case 1: {
        message.GroupID = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 After = 2;
      case 2: {
        message.After = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 Page = 3;
      case 3: {
        message.Page = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 PageSize = 4;
      case 4: {
        message.PageSize = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GetConversationResponse {
  Total?: Long;
  Page?: Long;
  PageSize?: Long;
  Msgs?: ChatMsg[];
}

export function encodeGetConversationResponse(message: GetConversationResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeGetConversationResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeGetConversationResponse(message: GetConversationResponse, bb: ByteBuffer): void {
  // optional int64 Total = 1;
  let $Total = message.Total;
  if ($Total !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $Total);
  }

  // optional int64 Page = 2;
  let $Page = message.Page;
  if ($Page !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $Page);
  }

  // optional int64 PageSize = 3;
  let $PageSize = message.PageSize;
  if ($PageSize !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $PageSize);
  }

  // repeated ChatMsg Msgs = 4;
  let array$Msgs = message.Msgs;
  if (array$Msgs !== undefined) {
    for (let value of array$Msgs) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeChatMsg(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeGetConversationResponse(binary: Uint8Array): GetConversationResponse {
  return _decodeGetConversationResponse(wrapByteBuffer(binary));
}

function _decodeGetConversationResponse(bb: ByteBuffer): GetConversationResponse {
  let message: GetConversationResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 Total = 1;
      case 1: {
        message.Total = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 Page = 2;
      case 2: {
        message.Page = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 PageSize = 3;
      case 3: {
        message.PageSize = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // repeated ChatMsg Msgs = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.Msgs || (message.Msgs = []);
        values.push(_decodeChatMsg(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Long {
  low: number;
  high: number;
  unsigned: boolean;
}

interface ByteBuffer {
  bytes: Uint8Array;
  offset: number;
  limit: number;
}

function pushTemporaryLength(bb: ByteBuffer): number {
  let length = readVarint32(bb);
  let limit = bb.limit;
  bb.limit = bb.offset + length;
  return limit;
}

function skipUnknownField(bb: ByteBuffer, type: number): void {
  switch (type) {
    case 0: while (readByte(bb) & 0x80) { } break;
    case 2: skip(bb, readVarint32(bb)); break;
    case 5: skip(bb, 4); break;
    case 1: skip(bb, 8); break;
    default: throw new Error("Unimplemented type: " + type);
  }
}

function stringToLong(value: string): Long {
  return {
    low: value.charCodeAt(0) | (value.charCodeAt(1) << 16),
    high: value.charCodeAt(2) | (value.charCodeAt(3) << 16),
    unsigned: false,
  };
}

function longToString(value: Long): string {
  let low = value.low;
  let high = value.high;
  return String.fromCharCode(
    low & 0xFFFF,
    low >>> 16,
    high & 0xFFFF,
    high >>> 16);
}

// The code below was modified from https://github.com/protobufjs/bytebuffer.js
// which is under the Apache License 2.0.

let f32 = new Float32Array(1);
let f32_u8 = new Uint8Array(f32.buffer);

let f64 = new Float64Array(1);
let f64_u8 = new Uint8Array(f64.buffer);

function intToLong(value: number): Long {
  value |= 0;
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0,
  };
}

let bbStack: ByteBuffer[] = [];

function popByteBuffer(): ByteBuffer {
  const bb = bbStack.pop();
  if (!bb) return { bytes: new Uint8Array(64), offset: 0, limit: 0 };
  bb.offset = bb.limit = 0;
  return bb;
}

function pushByteBuffer(bb: ByteBuffer): void {
  bbStack.push(bb);
}

function wrapByteBuffer(bytes: Uint8Array): ByteBuffer {
  return { bytes, offset: 0, limit: bytes.length };
}

function toUint8Array(bb: ByteBuffer): Uint8Array {
  let bytes = bb.bytes;
  let limit = bb.limit;
  return bytes.length === limit ? bytes : bytes.subarray(0, limit);
}

function skip(bb: ByteBuffer, offset: number): void {
  if (bb.offset + offset > bb.limit) {
    throw new Error('Skip past limit');
  }
  bb.offset += offset;
}

function isAtEnd(bb: ByteBuffer): boolean {
  return bb.offset >= bb.limit;
}

function grow(bb: ByteBuffer, count: number): number {
  let bytes = bb.bytes;
  let offset = bb.offset;
  let limit = bb.limit;
  let finalOffset = offset + count;
  if (finalOffset > bytes.length) {
    let newBytes = new Uint8Array(finalOffset * 2);
    newBytes.set(bytes);
    bb.bytes = newBytes;
  }
  bb.offset = finalOffset;
  if (finalOffset > limit) {
    bb.limit = finalOffset;
  }
  return offset;
}

function advance(bb: ByteBuffer, count: number): number {
  let offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error('Read past limit');
  }
  bb.offset += count;
  return offset;
}

function readBytes(bb: ByteBuffer, count: number): Uint8Array {
  let offset = advance(bb, count);
  return bb.bytes.subarray(offset, offset + count);
}

function writeBytes(bb: ByteBuffer, buffer: Uint8Array): void {
  let offset = grow(bb, buffer.length);
  bb.bytes.set(buffer, offset);
}

function readString(bb: ByteBuffer, count: number): string {
  // Sadly a hand-coded UTF8 decoder is much faster than subarray+TextDecoder in V8
  let offset = advance(bb, count);
  let fromCharCode = String.fromCharCode;
  let bytes = bb.bytes;
  let invalid = '\uFFFD';
  let text = '';

  for (let i = 0; i < count; i++) {
    let c1 = bytes[i + offset], c2: number, c3: number, c4: number, c: number;

    // 1 byte
    if ((c1 & 0x80) === 0) {
      text += fromCharCode(c1);
    }

    // 2 bytes
    else if ((c1 & 0xE0) === 0xC0) {
      if (i + 1 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 0xC0) !== 0x80) text += invalid;
        else {
          c = ((c1 & 0x1F) << 6) | (c2 & 0x3F);
          if (c < 0x80) text += invalid;
          else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    }

    // 3 bytes
    else if ((c1 & 0xF0) == 0xE0) {
      if (i + 2 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | (c3 << 8)) & 0xC0C0) !== 0x8080) text += invalid;
        else {
          c = ((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
          if (c < 0x0800 || (c >= 0xD800 && c <= 0xDFFF)) text += invalid;
          else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    }

    // 4 bytes
    else if ((c1 & 0xF8) == 0xF0) {
      if (i + 3 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | (c3 << 8) | (c4 << 16)) & 0xC0C0C0) !== 0x808080) text += invalid;
        else {
          c = ((c1 & 0x07) << 0x12) | ((c2 & 0x3F) << 0x0C) | ((c3 & 0x3F) << 0x06) | (c4 & 0x3F);
          if (c < 0x10000 || c > 0x10FFFF) text += invalid;
          else {
            c -= 0x10000;
            text += fromCharCode((c >> 10) + 0xD800, (c & 0x3FF) + 0xDC00);
            i += 3;
          }
        }
      }
    }

    else text += invalid;
  }

  return text;
}

function writeString(bb: ByteBuffer, text: string): void {
  // Sadly a hand-coded UTF8 encoder is much faster than TextEncoder+set in V8
  let n = text.length;
  let byteCount = 0;

  // Write the byte count first
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    byteCount += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }
  writeVarint32(bb, byteCount);

  let offset = grow(bb, byteCount);
  let bytes = bb.bytes;

  // Then write the bytes
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    if (c < 0x80) {
      bytes[offset++] = c;
    } else {
      if (c < 0x800) {
        bytes[offset++] = ((c >> 6) & 0x1F) | 0xC0;
      } else {
        if (c < 0x10000) {
          bytes[offset++] = ((c >> 12) & 0x0F) | 0xE0;
        } else {
          bytes[offset++] = ((c >> 18) & 0x07) | 0xF0;
          bytes[offset++] = ((c >> 12) & 0x3F) | 0x80;
        }
        bytes[offset++] = ((c >> 6) & 0x3F) | 0x80;
      }
      bytes[offset++] = (c & 0x3F) | 0x80;
    }
  }
}

function writeByteBuffer(bb: ByteBuffer, buffer: ByteBuffer): void {
  let offset = grow(bb, buffer.limit);
  let from = bb.bytes;
  let to = buffer.bytes;

  // This for loop is much faster than subarray+set on V8
  for (let i = 0, n = buffer.limit; i < n; i++) {
    from[i + offset] = to[i];
  }
}

function readByte(bb: ByteBuffer): number {
  return bb.bytes[advance(bb, 1)];
}

function writeByte(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 1);
  bb.bytes[offset] = value;
}

function readFloat(bb: ByteBuffer): number {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f32_u8[0] = bytes[offset++];
  f32_u8[1] = bytes[offset++];
  f32_u8[2] = bytes[offset++];
  f32_u8[3] = bytes[offset++];
  return f32[0];
}

function writeFloat(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  f32[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f32_u8[0];
  bytes[offset++] = f32_u8[1];
  bytes[offset++] = f32_u8[2];
  bytes[offset++] = f32_u8[3];
}

function readDouble(bb: ByteBuffer): number {
  let offset = advance(bb, 8);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f64_u8[0] = bytes[offset++];
  f64_u8[1] = bytes[offset++];
  f64_u8[2] = bytes[offset++];
  f64_u8[3] = bytes[offset++];
  f64_u8[4] = bytes[offset++];
  f64_u8[5] = bytes[offset++];
  f64_u8[6] = bytes[offset++];
  f64_u8[7] = bytes[offset++];
  return f64[0];
}

function writeDouble(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 8);
  let bytes = bb.bytes;
  f64[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f64_u8[0];
  bytes[offset++] = f64_u8[1];
  bytes[offset++] = f64_u8[2];
  bytes[offset++] = f64_u8[3];
  bytes[offset++] = f64_u8[4];
  bytes[offset++] = f64_u8[5];
  bytes[offset++] = f64_u8[6];
  bytes[offset++] = f64_u8[7];
}

function readInt32(bb: ByteBuffer): number {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  );
}

function writeInt32(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  bytes[offset] = value;
  bytes[offset + 1] = value >> 8;
  bytes[offset + 2] = value >> 16;
  bytes[offset + 3] = value >> 24;
}

function readInt64(bb: ByteBuffer, unsigned: boolean): Long {
  return {
    low: readInt32(bb),
    high: readInt32(bb),
    unsigned,
  };
}

function writeInt64(bb: ByteBuffer, value: Long): void {
  writeInt32(bb, value.low);
  writeInt32(bb, value.high);
}

function readVarint32(bb: ByteBuffer): number {
  let c = 0;
  let value = 0;
  let b: number;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 0x7F) << c;
    c += 7;
  } while (b & 0x80);
  return value;
}

function writeVarint32(bb: ByteBuffer, value: number): void {
  value >>>= 0;
  while (value >= 0x80) {
    writeByte(bb, (value & 0x7f) | 0x80);
    value >>>= 7;
  }
  writeByte(bb, value);
}

function readVarint64(bb: ByteBuffer, unsigned: boolean): Long {
  let part0 = 0;
  let part1 = 0;
  let part2 = 0;
  let b: number;

  b = readByte(bb); part0 = (b & 0x7F); if (b & 0x80) {
    b = readByte(bb); part0 |= (b & 0x7F) << 7; if (b & 0x80) {
      b = readByte(bb); part0 |= (b & 0x7F) << 14; if (b & 0x80) {
        b = readByte(bb); part0 |= (b & 0x7F) << 21; if (b & 0x80) {

          b = readByte(bb); part1 = (b & 0x7F); if (b & 0x80) {
            b = readByte(bb); part1 |= (b & 0x7F) << 7; if (b & 0x80) {
              b = readByte(bb); part1 |= (b & 0x7F) << 14; if (b & 0x80) {
                b = readByte(bb); part1 |= (b & 0x7F) << 21; if (b & 0x80) {

                  b = readByte(bb); part2 = (b & 0x7F); if (b & 0x80) {
                    b = readByte(bb); part2 |= (b & 0x7F) << 7;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    low: part0 | (part1 << 28),
    high: (part1 >>> 4) | (part2 << 24),
    unsigned,
  };
}

function writeVarint64(bb: ByteBuffer, value: Long): void {
  let part0 = value.low >>> 0;
  let part1 = ((value.low >>> 28) | (value.high << 4)) >>> 0;
  let part2 = value.high >>> 24;

  // ref: src/google/protobuf/io/coded_stream.cc
  let size =
    part2 === 0 ?
      part1 === 0 ?
        part0 < 1 << 14 ?
          part0 < 1 << 7 ? 1 : 2 :
          part0 < 1 << 21 ? 3 : 4 :
        part1 < 1 << 14 ?
          part1 < 1 << 7 ? 5 : 6 :
          part1 < 1 << 21 ? 7 : 8 :
      part2 < 1 << 7 ? 9 : 10;

  let offset = grow(bb, size);
  let bytes = bb.bytes;

  switch (size) {
    case 10: bytes[offset + 9] = (part2 >>> 7) & 0x01;
    case 9: bytes[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7F;
    case 8: bytes[offset + 7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
    case 7: bytes[offset + 6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
    case 6: bytes[offset + 5] = size !== 6 ? (part1 >>> 7) | 0x80 : (part1 >>> 7) & 0x7F;
    case 5: bytes[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7F;
    case 4: bytes[offset + 3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
    case 3: bytes[offset + 2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
    case 2: bytes[offset + 1] = size !== 2 ? (part0 >>> 7) | 0x80 : (part0 >>> 7) & 0x7F;
    case 1: bytes[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7F;
  }
}

function readVarint32ZigZag(bb: ByteBuffer): number {
  let value = readVarint32(bb);

  // ref: src/google/protobuf/wire_format_lite.h
  return (value >>> 1) ^ -(value & 1);
}

function writeVarint32ZigZag(bb: ByteBuffer, value: number): void {
  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint32(bb, (value << 1) ^ (value >> 31));
}

function readVarint64ZigZag(bb: ByteBuffer): Long {
  let value = readVarint64(bb, /* unsigned */ false);
  let low = value.low;
  let high = value.high;
  let flip = -(low & 1);

  // ref: src/google/protobuf/wire_format_lite.h
  return {
    low: ((low >>> 1) | (high << 31)) ^ flip,
    high: (high >>> 1) ^ flip,
    unsigned: false,
  };
}

function writeVarint64ZigZag(bb: ByteBuffer, value: Long): void {
  let low = value.low;
  let high = value.high;
  let flip = high >> 31;

  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint64(bb, {
    low: (low << 1) ^ flip,
    high: ((high << 1) | (low >>> 31)) ^ flip,
    unsigned: false,
  });
}
