import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/models/user';
import {MatSort} from '@angular/material/sort';
import { UserService } from 'src/app/service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ResponseDto } from 'src/app/models/response';



@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit {


  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['Email', 'Rol','Activo','Acciones'];
  constructor(
    private _userService: UserService, 
    private dialog: MatDialog
  
  ) { 
    
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.showAllUsers();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  showAllUsers() {
    this._userService.getAll().subscribe({
      next: (ResponseDto) => {
        console.log(ResponseDto);

        this.dataSource.data = ResponseDto.result as User[];
        console.log(ResponseDto.result as User[]);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  // dialogNewStudent() {
  //   this.dialog
  //     .open(Dialog, {
  //       disableClose: true,
  //       width: '30%',
  //     })
  //     .afterClosed()
  //     .subscribe((result) => {
  //       console.warn(result);
  //       if (result == 'created') {
  //         this.showAllUsers();
  //       }
  //     });
  // }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
