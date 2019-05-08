const execPromise = require("./execPromise");

describe("execPromise module", () => {
  it("should success exec", async () => {
    expect.assertions(2);
    const { stdout, stderr } = await execPromise("echo test");
    expect(stdout.trim()).toEqual("test");
    expect(stderr).toEqual("");
  });
  it("should fail exec if command exit with non zero code", async () => {
    expect.assertions(1);
    try {
      await execPromise("exit 1");
    } catch (e) {
      expect(e.toString().trim()).toEqual("Error: Command failed: exit 1");
    }
  });
  it("should fail if stderr is not empty", async () => {
    expect.assertions(1);
    try {
      await execPromise('(>&2 echo "test error")');
    } catch (e) {
      expect(e.toString().trim()).toEqual("Error: test error");
    }
  });
});
