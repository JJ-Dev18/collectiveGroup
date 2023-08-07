
export interface Benefits {
    benefit: Benefit
  }
  
  export interface Benefit{
    id: number
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date | null
  }


