
export class Column {
  prob: string;
  title: string;
}
export class ActionItem {
  public icon: string;
  public tooltip: string | Function;
  public translate ? = false;
  public onclick: Function;
  public showCallback?: Function;
  public materialColor?: string;
  public btnClass ? = 'btn-primary';
  public iconType: 'material' | 'fonawesome' = 'material';
}
export class ActionColumn extends Column {
  public actionItems: ActionItem[];
}

export class Grid {
  public columns: Column[];
  public service: any;
  public method: string;
  public actions?: ActionColumn;
}
