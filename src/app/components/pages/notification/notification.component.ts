import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service'
import { Constants } from '../../../shared/constants/constants'
@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit {
	// Modal -- Notification Delete Modal
	isVisible = false;
	showModal(): void {
		this.isVisible = true;
	}

	handleOk(): void {
		this.isVisible = false;
		this.profileService.clearNotificationList().subscribe();
		this.listOfData=[];
	}

	handleCancel(): void {
		this.isVisible = false;
	
			
	
	
	
	}

	// listOfData = [
	// 	{
	// 		key: '1',
	// 		name: 'John Brown',
	// 		age: 32,
	// 		address: 'New York No. 1 Lake Park'
	// 	}
	// ];
	listOfData: [];
	unread_count:number;
	constructor(private profileService: ProfileService) { }

	ngOnInit(): void {
		this.profileService.getNotificationList().subscribe(res => {
			this.listOfData = res['data'].reverse();
			this.unread_count=res['data'].length;
		})

	
		this.profileService.readNotification().subscribe();

		
	}

}
