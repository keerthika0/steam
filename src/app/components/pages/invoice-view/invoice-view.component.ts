import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Constants } from 'src/app/shared/constants/constants';
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';
import { ActivatedRoute, Router } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake'
import { AccountService } from '../../../services/account.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.less']
})
export class InvoiceViewComponent implements OnInit {

  @ViewChild('logo') logo:ElementRef;
 

  orderDetils: any;
  url = Constants.baseUrl;
  productDetail: any;
  settingData:any;
  logoImg;
  targetUrl;


  constructor(private router: Router,
    private route: ActivatedRoute,
    private cart: CartService,
    private translate: TranslateService,
    private accountService:AccountService) {  }
    
  ngOnInit(): void {
    this.translate.use(validLanguage(localStorage.getItem('locale')));
    this.getOrderDetails(this.route.snapshot.paramMap.get("id"));
    this.accountService.GetSettings().subscribe((res) => {
      if (res['success']) {
          this.settingData = res['data'];
        this.logoImg = this.url + res['data']['site_logo'];
        }
    });
      this.convertImgToBase64('../../../assets/images/logo.png', function(base64Img){
        this.capturedImage = base64Img;
      });
   
  }

  address: any = [];
  getOrderDetails(id) {
    this.cart.OrderDetails(id).subscribe((res) => {
      if (res['success']) {
        this.productDetail = res['data']['product'];
        this.orderDetils = res['data'];
        this.address = res['data']['address'];
       }
    })

  }

  isLoading = false;

  capturedImage
  convertImgToBase64(url,callback){
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image;
    img.crossOrigin = 'false';
    img.onload = function(){
      canvas.height = img.height;
      canvas.width = img.width;
        ctx.drawImage(img,0,0);
        var dataURL = canvas.toDataURL('image/png');
        callback.call(this, dataURL);
    
      // callback.call(this, dataURL);
          // Clean up
        canvas = null; 
    };
    img.src = url;
    }

   convetToPDF() {
     let val = htmlToPdfmake(document.getElementById('content').innerHTML);
    setTimeout(() => {
      console.log(this.capturedImage)
      const documentDefinition = {
      content: [
      {
        image:'data:image/png;base64,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',
        width: 100,
        height: 100,
        alignment: 'center'
       },
        val
      ],
      styles: {
        name: {
          fontSize: 12,
          // bold: true
          alignment: 'right',
           margin:[0, 0, 0, 20]
        },
        invoice: {
          fontSize: 12,
          // bold: true
          alignment: 'center',
          margin: [0, -50, 0, 0]
        },
        amount: {
          alignment: 'right',
          margin: [0, -45, 0, 0]
        },
        tbold:{
          bold:true,
          
        },
        mtop:{
          margin:[30,10,30,10],
         
        },
        table:{
           alignment:'vertical-middle',
           margin:[0,30,0,0]
        },
       
      }
    }
    pdfMake.createPdf(documentDefinition).download();
    this.isLoading = false;
    }, 3000);
    //  pdfmake.createPdf(documentDefinition).open();
    this.isLoading = true;
    var data = document.getElementById('content');
    // setTimeout(() => {
    //   html2canvas(data).then(canvas => {
    //     // Few necessary setting options
    //     var imgWidth = 200;
    //     var imgHeight = 100;

    //     const contentDataURL = canvas.toDataURL('image/png');

    //     let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    //      var position = 36;
    //     pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth, imgHeight);
    //     pdf.save('Invoice.pdf'); // Generated PDF
    //     this.isLoading = false;
    //   });

    // }, 10000);


  }


}
