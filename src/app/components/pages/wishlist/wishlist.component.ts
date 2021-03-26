import { Component, OnInit, ViewChild } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HeaderComponent } from 'src/app/shared/header/header.component'
import { Constants } from 'src/app/shared/constants/constants';
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.less']
})
export class WishlistComponent implements OnInit {
  @ViewChild('myChild') private myChild: HeaderComponent;

  wishList = [];
  url = Constants.baseUrl;


  constructor(private wish: WishlistService,
    private cart: CartService,
    private message: NzMessageService,
    private translate:TranslateService
) { }

  ngOnInit(): void {
    this.translate.use(validLanguage(localStorage.getItem('locale')));
    this.wishAll()
  }

  wishAll() {
    this.wish.WishAll().subscribe((res) => {
      this.wishList = res['data'];
    });
  }

  wishDelete(val) {
    this.wish.WishDelete(val).subscribe((res) => {
              this.message.success(res['message']);

      this.wishAll();
    });
  }

  //Cart
  addCart(data) {
    this.cart.AddCart({ id: data._id, price_id: 0,qty:1 }).subscribe((res) => {
      if (res['success']) {
        this.message.success(res['message']);
        this.myChild.ngOnInit();
       // this.wishDelete(data._id)
        this.wishAll();
      }
    });
  }

}
