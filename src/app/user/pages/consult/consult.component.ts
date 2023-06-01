import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})

export class ConsultComponent implements OnInit {

  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['Id','Email', 'Rol', 'Activo', 'Acciones'];
  showIdColumn:boolean;



  constructor(
    private _userService: UserService,
  ) {
    this.dataSource = new MatTableDataSource();
    this.showIdColumn= false;
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
        console.log(e);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  confirmDelete(user:User){
    console.log(user,user.id),
    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de Eliminar el Usuario : ${user.email}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.deleteUser(user.id).subscribe({
          next: (ResponseDto) => {
            console.log(ResponseDto);
            Swal.fire(
              'Eliminado!',
              'El Usuario ha sido Eliminado',
              'success'
            )
            this.showAllUsers();
          
          },
          error: (e) => {
            console.log(e);
            Swal.fire(
              'Error!',
              'No se pudo Eliminar!',
              'error'
            )
          },
        });
      }
    })
  }

}
