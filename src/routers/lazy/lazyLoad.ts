import { ComponentType, lazy } from 'react'

export const lazyLoad = <T>(importPromise: Promise<Record<string, ComponentType<T>>>, componentName: string) =>
  lazy(() => importPromise.then((module) => ({ default: module[componentName] })))
