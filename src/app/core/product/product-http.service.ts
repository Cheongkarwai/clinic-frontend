import {Injectable} from "@angular/core";
import {Product} from "./product.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject, filter, map, shareReplay, ReplaySubject} from "rxjs";
import {ProductInfo} from "./product-info.model";
import {createParam} from "../shared/web.function";
import {Apollo, MutationResult} from "apollo-angular";
import {GET_PRODUCTS, GET_PRODUCT_BY_ID} from "../graphql/graphql.operation";
import {Filter, Search, TableCriteria} from "../shared/page";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private path: string = 'http://localhost:8080/api/products';
  private products: Product[] = [];
  private product$ = new ReplaySubject<Product>();
  private products$ = new BehaviorSubject<Product[]>(this.products);
  private page$ = new BehaviorSubject<any>(null);
  private options;

  constructor(private http: HttpClient, private apollo: Apollo) {
    this.options = {
      headers: {
        // 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMjA4MjgxNDA1NjMiLCJleHAiOjE2ODc2MTIzMDYsImlhdCI6MTY4NTg4NDMwNiwic2NvcGUiOiIifQ._3RgCXo4XMTwSACTW-ujhdLDBubP4sbj890wBFzyxWI'
      },
      params: {},
    }
  }

  findAll(pageInfo: any) {
    this.apollo.use('products').query({
      query: GET_PRODUCTS,
      variables: {
        first: pageInfo.first,
        after: pageInfo.after,
        before: pageInfo.before,
        last: pageInfo.last
      }
    }).pipe(shareReplay(1))
      .subscribe((res: any) => {
        console.log(res);
        const data: any[] = res.data.products.edges;
        const products: Product[] = data.map(({node}: any) => {
          return {
            id: node.id,
            name: node.name,
            price: node.price,
            description: "",
            is_added_to_cart: false,
            availableQuantity: node.availableQuantity
          }
        });
        products.forEach(product => product.is_added_to_cart = true);
        this.products = products;
        this.products$.next(products);
        this.page$.next(res.data.products.pageInfo);
      });
  }

  createProduct(product: Product): Observable<object> {
    return this.http.post<object>(this.path, product, this.options);
  }

  // loadProducts(params:object){
  //     this.options['params'] = createParam(params);
  //     this.http.get<ProductInfo>(this.path,this.options)
  //         .subscribe(res=>this.products$.next(res));
  // }

  findProductById(id: string) {

    this.apollo.use('products').query({
      query: GET_PRODUCT_BY_ID,
      variables: {
        id: id
      }
    }).pipe(shareReplay(1))
      .subscribe((res: any) => {
        console.log(res);
        this.product$.next(res.data.product)
      });

  }

  getProducts$(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  getProduct$(): Observable<Product> {
    return this.product$.asObservable();
  }

  getPage$() {
    return this.page$.asObservable();
  }
}
