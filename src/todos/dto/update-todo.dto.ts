import { ApiProperty } from "@nestjs/swagger"

export class UpdateTodoDto {
  @ApiProperty()
  isCompleted: boolean

  @ApiProperty()
  todoId: number
}
