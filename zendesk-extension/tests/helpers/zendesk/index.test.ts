import { vi, describe, expect, test, beforeAll } from "vitest";
import {
  Client,
  ZAFClient,
  ZAFWindow,
  getClient,
} from "../../../src/helpers/zendesk";
import { getMockClient } from "../../../src/helpers/zendesk/mockClient";

const mockClient: Client = getMockClient();

const mockZAFClient: ZAFClient = {
  init: () => mockClient,
};

const zafWindow = window as ZAFWindow;

describe("zendesk", () => {
  beforeAll(() => {
    zafWindow.ZAFClient = mockZAFClient;
  });

  describe("getClient", () => {
    test("invoke", () => {
      const spy = vi.spyOn(mockClient, "invoke");

      getClient();

      expect(spy).toHaveBeenCalledWith("resize", {
        width: "100%",
        height: "800px",
      });
    });
  });
});
