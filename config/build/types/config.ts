export type BuildMode = 'production' | 'development'

export interface BuildPaths {
  /** Путь до входной точки приложения */
  entry: string,
  /** Путь до папки для сборки */
  build: string,
  /** Путь до html файла */
  html: string
  /** Путь до src */
  src: string
}

export interface BuildEnv {
  /** Режим сборки */
  mode: BuildMode,
  /** Порт */
  port: number
}

export interface BuildOptions {
  /** Режим сборки */
  mode: BuildMode
  /** Пути */
  paths: BuildPaths
  /** Флаг дев режима */
  isDev: boolean
  /** Порт */
  port: number
}