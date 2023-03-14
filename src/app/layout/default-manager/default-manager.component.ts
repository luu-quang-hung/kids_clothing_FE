import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { items } from './router.model';

@Component({
  selector: 'app-default-manager',
  templateUrl: './default-manager.component.html',
  styleUrls: ['./default-manager.component.css']
})
export class DefaultManagerComponent implements OnInit {
  public expanded = true;
  public item: any = {};
  public drawItems = this.resetItems();

  constructor(private router: Router) { }

  ngOnInit(): void {
    let itemSelected = null;
    let url = window.location.href;
    let str = url.replace('http://localhost:4200/manager/','');
    itemSelected = this.drawItems.find((x:any)=> x.path == str);
    if(itemSelected == null){
      let getChildren: any[] = [];
      let arr = this.drawItems.filter((x:any)=> x.hasOwnProperty('children') == true);
      arr.map((x)=>{
        let data = x.children;
        for(let i = 0; i < data.length;i++){
          getChildren.push(data[i]);
        }
      })
      itemSelected = getChildren.find((x:any) => x.path == str);
      itemSelected.selected = true;
    }else{
      itemSelected.selected = true;
    }
  }

  signOut(): void {
    sessionStorage.removeItem('USERNAME');
    sessionStorage.removeItem('TOKEN');
  }
  onSelect(event: any): void {
    if (!event.item.hasOwnProperty('children')) {
      window.location.href = "/manager/" + event.item.path
    } else {
      const text = event.item.text;
      const newItems = this.resetItems();
      const index = newItems.findIndex((i) => i.text === text);
      newItems[index].selected = true;
      if (!event.item.expanded) {
        newItems[index].expanded = true;
        this.addChildren(newItems, index, newItems[index].children);
      }
      this.drawItems = newItems;
    }
  }
  public addChildren(arr: any, index: any, children: Array<any>) {
    arr.splice(index + 1, 0, ...children);
  }
  public resetItems(): Array<any> {
    const arr: any[] = [];
    items.forEach((item) => {
      arr.push(Object.assign({}, item));
    });
    return arr;
  }
}
