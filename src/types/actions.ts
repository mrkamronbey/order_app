export type ActionType = {
  label: string
  icon: React.ReactNode
  color?: string
  action: (row: any) => void
}
