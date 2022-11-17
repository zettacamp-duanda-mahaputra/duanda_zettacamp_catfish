import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  menus:any = []
  constructor(private menuService:MenuService) { }

  ngOnInit(): void {
    this.menuService.get().subscribe((data:any)=>{
      console.log(data);
      this.menus = data.data.getAllRecipes.data
    })
  }

}
