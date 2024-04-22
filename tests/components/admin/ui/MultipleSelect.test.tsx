import { render } from "@testing-library/react";
import MultipleSelect from "fleed/components/admin/ui/multipleSelect/MultipleSelect";
import { Benefit } from "fleed/interfaces";
import { FormProvider, useFormContext } from "react-hook-form";

const list: Benefit[] = [];
const itemList: Benefit[] = [];
const name = "n";

jest.mock("react-hook-form");

describe("Pruebas en el multiselect", () => {
  const mockUseForm = useFormContext as jest.Mock;
  beforeEach(() => {
    mockUseForm.mockImplementation(() => ({
      register: jest.fn(),
      watch: jest.fn(),
    }));
  });
  test("debe renderizar con la list por defecto", () => {
    render(<MultipleSelect list={list} name={name} itemList={itemList} />);
  });
});
