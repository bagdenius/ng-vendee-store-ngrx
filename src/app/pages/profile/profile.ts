import { Component } from '@angular/core';
import {
  LucideMail,
  LucideMapPin,
  LucidePhone,
  LucideUser,
} from '@lucide/angular';

@Component({
  selector: 'profile-page',
  templateUrl: './profile.html',
  imports: [LucideMail, LucidePhone, LucideUser, LucideMapPin],
})
export class ProfilePage {}
