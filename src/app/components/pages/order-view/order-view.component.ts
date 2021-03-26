import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Constants } from 'src/app/shared/constants/constants';
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';

@Component({
	selector: 'app-order-view',
	templateUrl: './order-view.component.html',
	styleUrls: ['./order-view.component.less']
})
export class OrderViewComponent implements OnInit {
	orderDetils :any;
	url = Constants.baseUrl;

	constructor(private router: Router,
		private route: ActivatedRoute,
		private cart: CartService,
		private translate:TranslateService) { }

	ngOnInit(): void {
		this.translate.use(validLanguage(localStorage.getItem('locale')));
		this.getOrderDetails(this.route.snapshot.paramMap.get("id"));
	}
address:any = [];
	getOrderDetails(id){
		this.cart.OrderDetails(id).subscribe((res) => {
			if (res['success']) {
				this.orderDetils = res['data'];
				this.address = res['data']['address']
			}
		})

	}

}
