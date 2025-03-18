/// <reference types="node" />

/**
 * Session model.
 */
export interface Session {
  /**
   * JSON representation of the session.
   */
  toJSON(): object;

  /**
   * alias to `toJSON`
   */
  inspect(): object;

  /**
   * Return how many values there are in the session object.
   * Used to see if it"s "populated".
   */
  readonly length: number;

  /**
   * populated flag, which is just a boolean alias of .length.
   */
  readonly populated: boolean;

  /**
   * get/set session maxAge
   */
  maxAge: number;

  /**
   * destroy the session
   */
  destroy(): void;

  /**
   * commit this session's headers if autoCommit is set to false.
   */
  manuallyCommit(): Promise<void>;

  /**
   * regenerate this session
   */
  regenerate(callback?: () => void): void;

  /**
   * save this session no matter whether it is populated
   */
  save(callback?: () => void): void;

  /**
   * allow to put any value on session object
   */
  [_: string]: any;
}

interface Cfg {
  keys?: string[] /** (array) keys when signed is true */;
  key?: string /** (string) cookie key (default is bp.ss) */;
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge?: number; // default 86400000,
  autoCommit?: boolean /** (boolean) automatically commit headers (default true) */;
  overwrite?: boolean /** (boolean) can overwrite or not (default true) */;
  httpOnly?: boolean /** (boolean) httpOnly or not (default true) */;
  signed?: boolean /** (boolean) signed or not (default true) */;
  rolling?: boolean /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */;
  renew?: boolean /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/;
  secure?: boolean /** (boolean) secure cookie* (default is false)/; **/
  sameSite?: string /** (string) session cookie sameSite options (default undefined, don't set it) */;
  store?: any;  /** (object) session storage is dependent on your external store */
  externalKey?: { /** (object) external key default is cookie */
    get: (ctx: any) => string;
    set: (ctx: any, key: string) => void;
  }
}

interface BpframeworkMiddleware {
  type: string;
  afterRoute: (app: any) => Promise<boolean>;
  beforeRoute: (app: any) => Promise<boolean>;
  initiator: (app: any) => void;
}

export const name: string;

export function middleware(cfg?: Cfg): BpframeworkMiddleware;
