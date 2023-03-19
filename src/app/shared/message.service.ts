import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class MessageService {
    private subjectBadge = new Subject<string>();
    private subjectStorage = new Subject<any>();
    private subjectFilter = new Subject<string>();
    private subjectTokenAccount = new Subject<any>();
    private subjectDataAfterUpdate = new Subject<any>();
    private subjectLoadingVisible = new Subject<any>();
    private behaviorSubjectData = new BehaviorSubject<any[]>([]);
    constructor() { }

    ///// Set lại length của storage ////
    SendBadgeCart(message: any) {
        this.subjectBadge.next(message)
    }
    receivedMessage(): Observable<any> {
        return this.subjectBadge.asObservable(); 
    }
    ///// Set lại storage ////
    SendStorageCart(message: any){
        this.subjectStorage.next(message);
    }
    receivedStorageCart():Observable<any>{
        return this.subjectStorage.asObservable();
    }
    /////Gửi token cho component header////
    SendTokenAccount(message: any){
        this.subjectTokenAccount.next(message)
    }
    receivedTokenAccount():Observable<any>{
        return this.subjectTokenAccount.asObservable();
    }
    ////Load lại data sau khi update/////
    SendDataAfterUpdate(message: any){
        this.subjectDataAfterUpdate.next(message);
    }
    receivedDataAfterUpadte():Observable<any>{
        return this.subjectDataAfterUpdate.asObservable();
    }
    /////Filter sản phẩm theo trạng thái /////
    SendFilterProduct(message: any){
        this.subjectFilter.next(message)
    }
    receviedFilterProduct(): Observable<any>{
        return this.subjectFilter.asObservable();
    }
    ///// Send loading ///////
    SendLoadingVisible(message: any){
        this.subjectLoadingVisible.next(message);
    }
    receviedLoadingVisible(): Observable<any>{
        return this.subjectLoadingVisible.asObservable();
    }
    ///// Thay đổi data sau khi sửa data trên grid ///////
    SendDataBehavior(message: any){
        this.behaviorSubjectData.next(message);
    }
    receivedDataBehavior(): Observable<any>{
        return this.behaviorSubjectData.asObservable();
    }
}