import axios, { CancelToken, CancelTokenSource } from 'axios';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { LogApp } from '../utilities';
interface HeaderProps {
  cancelToken: CancelToken;
}
export const useCancelRequest = (
  onFetch: (headers: AbortSignal) => Promise<any>,
  onCancel?: () => void,
) => {
  const abortRef = useRef<AbortController | null>(null);
  const getSignal = useCallback(() => {
    abortRef.current = new AbortController();
    return abortRef.current.signal;
  }, []);
  const fetchPost = useCallback(async () => {
    try {
      await onFetch(getSignal());
    } catch (e) {
      LogApp(abortRef.current, 'kuku');
      if (abortRef.current?.signal.aborted) {
        LogApp('request cancelled!');
      }
    }
  }, [onFetch]);
  useEffect(() => {
    fetchPost();
    return () => {
      abortRef.current?.abort();
      onCancel?.();
    };
  }, [onFetch]);
};
