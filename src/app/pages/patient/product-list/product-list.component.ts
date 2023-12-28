import { Component, OnInit,OnDestroy, ViewChild, ChangeDetectionStrategy, AfterViewInit, QueryList, ElementRef, ViewChildren, AfterViewChecked, ChangeDetectorRef, InjectionToken, Inject } from '@angular/core';
import { BehaviorSubject, Observable, map, shareReplay } from 'rxjs';
import { ProductService } from '../../../core/product/product-http.service';
import { Product } from '../../../core/product/product.model';
import { ProductInfo } from '../../../core/product/product-info.model';
import { FormBuilder } from '@angular/forms';
import {Modal} from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { faPenToSquare,faHeart,faStar, faList, faTable,faEye } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from '../../../core/shared/pagination.model';
import { Apollo } from 'apollo-angular';
import { GET_PRODUCTS } from 'src/app/core/graphql/graphql.operation';
import * as braintree from 'braintree-web';
import { HttpClient } from '@angular/common/http';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { QrCodeGenerator } from 'src/app/core/qr/qr-code-generator.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ScannerService } from 'src/app/core/qr/scanner.service';
import { ZXingScannerService } from 'src/app/core/qr/zxing-scanner.service';
import { TableCriteria } from 'src/app/core/shared/page';
import {CartService} from "../../../core/cart/cart.service";
import {Item} from "../../../core/cart/item.interface";
import {
  ConfirmationDialogComponent,
  ConfirmDialogModel
} from "../../../components/dialog/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NotificationToast} from "../../../components/notification/customized.alert";

const SCANNER_TOKEN = new InjectionToken<ScannerService>('scanner');

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers:[
    {provide:'zxingScannerService',useClass:ZXingScannerService}
  ]
})
export class ProductListComponent implements OnInit,AfterViewInit,AfterViewChecked{

  products$! : Observable<Product[]>;

  editProduct$ = new Observable<Product>();

  //icon
  faPenToSquare = faPenToSquare;
  faHeart = faHeart;
  faStar = faStar;
  faEye = faEye;
  faList = faList;
  faTable = faTable;


  //pagination
  //pageInfo:any = {};

  //params:Pagination = {page:this.pageInfo.page,size:this.pageInfo.size};

  exampleModal:Modal | undefined;


  //product page
  products:Product[] = [];

  hostedFieldsInstance!: braintree.HostedFields;
  cardholdersName: string = '';

  pageInfo:any = {

  };

  params:any = {
    first:6,
    after:null,
    last:null,
    before:null
  };
  search:string = '';
  columnsToSearch:string[] = ['name','description'];



  image!:any;
  cartItem$!:Observable<Item[]>;
  columnsToDisplay:string [] = ['id','name','description'];

  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;
  @ViewChildren('panel') panels!:QueryList<ElementRef>;

  itemSizeInPx:number = 0;
  listenViewportItemSize:BehaviorSubject<number> = new BehaviorSubject<number>(0);



  constructor(private productService:ProductService,private qrCodeGenerator:QrCodeGenerator,
    private domSanitizer:DomSanitizer,private changeDetectorRef:ChangeDetectorRef,private cartService:CartService,
              private dialog:MatDialog) { }


  ngAfterViewInit():void{

  //   this.virtualScroll.elementScrolled()
  // .subscribe(event => {
  //   console.log(event);
  // });
    this.panels.changes.subscribe(()=>{
        console.log(this.panels.first.nativeElement.offsetHeight);
      this.listenViewportItemSize.next(this.panels.first.nativeElement.offsetHeight);
    });
  }

  ngAfterViewChecked(): void {
      this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {

  this.listenViewportItemSize.subscribe(res=>this.itemSizeInPx = res);

  this.qrCodeGenerator.generateQrCode({cht:'qr',chs:'200x200',chl:'hey'}).subscribe(res=>{
    let url = URL.createObjectURL(res);
    this.image = this.domSanitizer.bypassSecurityTrustUrl(url);
  });

   this.findProduct(this.params);

            // this.http.post('http://localhost:8080/api/report/download',null,{
            //   responseType:'blob',
            //   observe:'response'
            // }).subscribe(res=>{
            //   const contentDispositionHeader = res.headers.get('Content-Disposition');
            //   if(contentDispositionHeader){
            //     const file = contentDispositionHeader.split("=");
            //     let url = URL.createObjectURL(res.body as Blob);
            //   var anchor = document.createElement("a");
            //   anchor.download = file[1];
            //   anchor.href = url;
            //   anchor.click();
            //   }
            // });

    // this.productService.loadProducts(this.params);
    // this.products$ = this.productService.getProducts$();
    // this.products$.subscribe(res=>console.log(res));
    this.cartItem$ = this.cartService.getItem$();
  }

  getDefaultParams(){
    // return {
    //   page : {
    //     first:this.first,
    //     after:this.after,
    //     last:this.last,
    //     before:this.before
    //   },
    //   search:{
    //     value:this.search,
    //     columns:this.columnsToSearch
    //   },
    //   filter:{
    //     filters:[]
    //   }
    // }
  }

  saveProduct(event:any){
    // const productData:Product = {
    //   name:this.name.getRawValue(),
    //   description:this.description.getRawValue(),
    //   price:this.price.getRawValue()
    // };

    // this.productService.createProduct(productData).subscribe(res=>{
    //   this.productService.loadProducts(this.params);
    //   this.products$ = this.productService.getProducts$();
    // });
  }

  getCurrentPage(page:number){
    //this.params['page'] = page;
    //this.productService.loadProducts(this.params);
  }
  openModal(){
    this.exampleModal = new bootstrap.Modal(document.getElementById('exampleModal') as HTMLElement,{});
    this.exampleModal?.show();
  }

  closeModal(event:any){
    this.exampleModal?.hide();
  }

  editProduct(id:string){
    this.exampleModal = new bootstrap.Modal(document.getElementById('exampleModal') as HTMLElement,{});
    this.exampleModal?.show();
    //this.editProduct$ = this.productService.findProductById(id);
  }

  onLoadNextProduct(index:any){
    console.log(this.virtualScroll.getRenderedRange().end);
    console.log(this.virtualScroll.getDataLength())
    console.log(this.virtualScroll.measureScrollOffset('bottom'));
    if(this.virtualScroll.getRenderedRange().end === this.virtualScroll.getDataLength()){
      if(this.pageInfo.hasNextPage){
        console.log(this.pageInfo);
        const params = this.params;
        params['after'] = this.pageInfo.endCursor;
        this.addProduct(params);
      }
    }
  }

  addProduct(tableCriteria:TableCriteria){
    // this.productService.findAll(tableCriteria)
    //         .pipe(shareReplay(1)).subscribe((res:any)=>{
    //           const data:any[] = res.data.products.edges;
    //           const products:any[] = data.map(({node}:any)=>node);
    //           this.products = this.products.concat(products);
    //           this.pageInfo = res.data.products.pageInfo;
    //         });
  }


  findProduct(pageInfo:any){
    this.productService.findAll(pageInfo);
    this.products$ = this.productService.getProducts$();
  }

  handleSearch(event:any){
    this.findProduct(this.getDefaultParams());
  }

  addToCart(product:Product) {

    const {id,name,price,description} = product;
    const dialogData = new ConfirmDialogModel("Add to cart", `Name : ${name} `);

    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(predicate=>{
      if(predicate){
        const item :Item = {
          id:id,
          name:name,
          price:price,
          quantity:0
        };
        this.cartService.addToCart(item);
        NotificationToast.fire({
          icon: 'success',
          title: 'Successfully Added to cart'
        }).then(result => {

        });
      }
    });

  }

  viewDetails(product: Product) {

  }
}
