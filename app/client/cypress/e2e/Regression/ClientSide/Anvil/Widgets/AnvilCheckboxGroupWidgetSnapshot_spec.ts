import { ANVIL_EDITOR_TEST } from "../../../../../support/Constants";
import {
  agHelper,
  anvilSnapshot,
} from "../../../../../support/Objects/ObjectsCore";

describe(
  `${ANVIL_EDITOR_TEST}: Anvil tests for Checkbox Group Widget`,
  { tags: ["@tag.Anvil"] },
  () => {
    before(() => {
      agHelper.AddDsl("anvilCheckboxGroupWidget");
    });

    it("1. Canvas Mode", () => {
      anvilSnapshot.triggerCheckboxGroupInvalidState();
      anvilSnapshot.verifyCanvasMode("CheckboxGroupWidget");
    });

    it("2. Preview Mode", () => {
      anvilSnapshot.verifyPreviewMode("CheckboxGroupWidget");
    });

    it("3. Deploy Mode", () => {
      anvilSnapshot.verifyDeployMode("CheckboxGroupWidget");
    });
  },
);
