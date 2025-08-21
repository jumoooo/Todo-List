export interface TodoListData {
  id: number;
  tenantId: string;
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: Boolean;
}
export interface TodoDispatchContextType {
  updateTodo: (id: number) => Promise<void>;
}
export interface TodoListUpdateData {
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: Boolean;
}
