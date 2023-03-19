import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { EventManager } from "@angular/platform-browser";
import { DialogService, WindowService } from "@progress/kendo-angular-dialog";
import { NotificationService } from "@progress/kendo-angular-notification";
import { FileInfo, SelectEvent } from "@progress/kendo-angular-upload";
import { State } from "@progress/kendo-data-query";
import { ApiService } from "src/app/shared/api.service";
import { MessageService } from "src/app/shared/message.service";
@Component({
    selector: "window-info",
    templateUrl: './windowUpload.component.html',
})
export class WindowUploadComponent implements OnInit {
    @Input() public formGroup !: FormGroup;
    @Input() public dataSource: any;
    @Input() public status: String | undefined;

    public imagePreview: any[] = [];
    public listImage: Array<any> = [];
    public state: State = {
        filter: undefined,
        skip: 0,
        take: 10,
        group: [],
        sort: [],
    };

    constructor(private message: MessageService, public http: HttpClient, private windowService: WindowService, private dialogService: DialogService,
        private notificationService: NotificationService, private formBuilder: FormBuilder) { }
    public Image: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
    
    ngOnInit(): void {
        this.Image.Controller = "RestUploatImgController";
        this.Image.getApi('manager/image/list/' + this.dataSource.id).subscribe((rs) => {
            this.listImage = rs.data;
        })
    }
    update(event: any): void {
        if(this.imagePreview.length == 0){
            return this.Image.Notification.notificationWarning('Không được để trống ảnh')
        }
        event.preventDefault();
        let formData = new FormData();
        if (this.imagePreview.length > 0) {
            for (let i = 0; i < this.imagePreview.length; i++) {
                formData.append("files", this.imagePreview[i].rawFile);
            }
        }
        formData.append("idPro", this.dataSource.id);
        this.Image.postApi(('manager/image/upload'), formData).subscribe((rs) => {
            let result = rs;
        })
    }
    select(e: SelectEvent): void {
        this.imagePreview = e.files;
    }
    addHandler(event: any): void {
        this.Image.Create.Execute(null, event.sender.data.data);
        event.sender.addRow(this.Image.formGroup);
    }
    saveHandler(event: any) {
        this.Image.Grid.saveHandler(event);
        event.sender.closeRow(event.rowIndex);
    }

    cellClickHandler(event: any): void {
        this.Image.Grid.cellClickHandler(event);
    }
    cellCloseHandler(event: any): void {
        this.Image.Grid.cellCloseHandler(event);
    }

    removeHandler(event: any): void {
        this.Image.Grid.removeHandler(event);
        event.sender.cancelCell();
    }

    cancelChanges(grid: any): void {
        grid.cancelCell();
    }

    cancelHandler(event: any): void {
        event.sender.closeRow(event.rowIndex);
    }
}