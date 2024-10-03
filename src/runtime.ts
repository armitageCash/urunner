export type UseCaseResult<T> = {
  data: T | null;
  status: "success" | "error";
  message: string;
};

type Adapter<P, D, R> = (params: P, dependencies: D) => Promise<R>;

export type UsecaseType<P, D, R> = (params: P, dependencies: D) => Promise<R>;

export class Runtime<P, D, R> {
  private dependencies: D;
  private adapter?: Adapter<P, D, R>;
  private useCaseResult?: R;

  constructor(adapter?: Adapter<P, D, R>) {
    this.adapter = adapter;
    this.dependencies = {} as D;
  }

  attach(factory: (dependencies: D) => void): this {
    factory(this.dependencies);
    return this;
  }

  async run(params?: P): Promise<R> {
    if (!this.adapter) {
      throw new Error("Adapter not set");
    }
    this.useCaseResult = await this.adapter(params as P, this.dependencies);
    return this.useCaseResult;
  }
}
