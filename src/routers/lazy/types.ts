import { ComponentType, LazyExoticComponent } from 'react'

export type LazyComponent<T> = LazyExoticComponent<ComponentType<T>>
