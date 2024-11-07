export interface Plugin {
  execute(...args: any[]): void;
}
