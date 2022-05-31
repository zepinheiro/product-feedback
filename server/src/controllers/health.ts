type HealtResponse = {
  message: string;
};

export default class HealthController {
  public async getMessage(): Promise<HealtResponse> {
    return {
      message: "Running Ok!",
    };
  }
}
