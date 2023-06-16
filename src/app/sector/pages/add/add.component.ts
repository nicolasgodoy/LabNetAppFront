import {
  Component,
  OnInit,
  Inject,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { sectorService } from 'src/app/service/sector.service';
import { Sector } from 'src/app/models/sector';
import { ResponseDto } from 'src/app/Response/responseDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alert } from 'src/app/helpers/alert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements AfterViewInit, OnInit {
  formSector: FormGroup;
  tituloAccionSkill: string = 'Nuevo';
  botonAccion: string = 'Guardar';
  listaSector: Sector[] = [];
  dataSource = new MatTableDataSource<Sector>();
  displayedColumns: string[] = ['description', 'acciones'];

  constructor(
    private spinnerService: NgxSpinnerService,
    private sectorService: sectorService,
    private dialogoReferencia: MatDialogRef<AddComponent>,
    private fb: FormBuilder,

    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataSector: Sector
  ) {
    this.formSector = this.fb.group({
      description: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')],
      ],
    });

    this.sectorService.getAllSector().subscribe({
      next: (data: ResponseDto) => {
        this.listaSector = data.result;
      },
      error: (e) => {},
    });
  }

  ngOnInit(): void {
    
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  AddSectors(): void {
    if (this.formSector.valid) {
      const modelo: Sector = {
        description: this.formSector.value.description,
      };
      this.sectorService.addSector(modelo).subscribe(
        (ResponseDto: Sector) => {
          Alert.mensajeExitoToast();
          this.dialogoReferencia.close('creado');
        },
        (error: any) => {
          console.log(error);
          console.log(error.error.message);
          Alert.mensajeSinExitoToast(error.error.message);
        }
      );
    } else {
    }
  }

  dialogAddSector() {
    this.dialog
      .open(AddComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'creado') {
          
        }
      });
  }

  confirmDelete(dataSector: Sector) {
    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de Eliminar el Sector : ${dataSector.description}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sectorService.deleteSector(dataSector.id).subscribe({
          next: (ResponseDto) => {
            console.log(ResponseDto);
            Alert.mensajeExitoToast();
          },
          error: (e) => {
            console.log(e);
            Alert.mensajeSinExitoToast();
          },
        });
      }
    });
  }
}
