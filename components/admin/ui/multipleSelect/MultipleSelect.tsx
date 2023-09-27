import React, { FC, useEffect, useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Benefit, Benefits } from "fleed/interfaces";
import { Controller, useFormContext } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(id: number, benefitsIds: readonly Benefits[], theme: Theme) {
  return {
    fontWeight:
      benefitsIds.findIndex((benefit) => benefit.benefit.id === id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type Props = {
  benefits: Benefit[] | undefined;
  productBenefits?: Benefit[];
};

const MultipleSelect: FC<Props> = ({ benefits, productBenefits = [] }) => {
  const theme = useTheme();
  const [benefitsIds, setBenefitIds] = React.useState<Benefit[]>(productBenefits);
  const [ benefitsCharged , setBenefits ] = useState(benefits)
  const { register, control, setValue ,getValues} = useFormContext();

  // useEffect(() => {
  //   setBenefitIds(productBenefits as any);
  // }, [productBenefits]);
//  console.log(getValues("benefits"),"benefits getr values ")
  const handleChange = (event: SelectChangeEvent<Benefit[]>) => {
    const {
      target: { value },
    } = event;
    setBenefitIds(value as any);
    setValue('benefits', value)
  };

  return (
    <div>
      {/* <Controller
        name="benefits"
        control={control}
        rules={{
          required: true,
          validate: () => {
            return getValues("benefits").find( (benefit: Benefit) => benefit.id);
          }
        }}
        defaultValue={productBenefits}
        render={({ field }) => (
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="age">benefits</InputLabel>
            <Select
              {...field}
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={field.value}
              onChange={field.onChange}
              // onChange={(event: SelectChangeEvent<Benefit[]>) => field.onChange(event)}
              displayEmpty={true}
              input={
                <OutlinedInput id="select-multiple-chip" label="Benefits" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value:Benefit) => (
                    <Chip
                      key={value.id}
                      label={value.name}
                      onDelete={() =>
                        setBenefitIds(
                          field.value.filter((item:any) => item !== field.value)
                        )
                      }
                      deleteIcon={
                        <CancelIcon
                          onMouseDown={(event) => event.stopPropagation()}
                        />
                      }
                    />
                  ))}
                </Box>
              )}
              renderValue={(selected:Benefit[]) => {
                return (
                  selected?.map((option:Benefit) => option.name).join(", ") ||
                  "Select some options"
                );
              }}
              MenuProps={MenuProps}
            >
             
              {benefits?.map((benefit,index) => (
                <MenuItem
                  key={benefit.id}
                  // value={benefit.id}
                  value={benefit as any}
                  // style={getStyles(benefit.id, benefitsIds, theme)}
                >
                  {field.value.indexOf(benefit) >= 0 ? 'esta' : 'no esta'}
                  {
                    field.value.includes(benefit) ? 'esta' : 'no esta'
                  }
                  {benefit.name} 
                  {benefitsIds.includes(benefit) ? <CheckIcon color="info" /> : null}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      /> */}
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">Benefits</InputLabel>
        <Select
          {...register("benefits")}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={benefitsIds}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Benefits" />}
          renderValue={(selected : Benefit[]) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.id} label={value.name} onDelete={() =>{
                  const newValues = benefitsIds.filter((item) => item !== value)
                  setBenefitIds(
                   newValues
                  )
                  setValue('benefits',newValues)
                }
                }
                deleteIcon={
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                } />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {benefits?.map((benefit) => (
            <MenuItem
              key={benefit.id}
              // value={benefit.id}
              value={benefit as any}
              // style={getStyles(benefit.id, benefitsIds, theme)}
            >
              {benefit.name}
              {benefitsIds.includes(benefit) ? <CheckIcon color="info" /> : null}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelect;
