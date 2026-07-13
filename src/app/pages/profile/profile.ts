import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  LucideMail,
  LucideMapPin,
  LucidePhone,
  LucideUser,
} from '@lucide/angular';
import { Store } from '@ngrx/store';
import { userFeature } from '../../shared/store/user/user.feature';
import { userActions } from '../../shared/store/user/user.actions';
import { authFeature } from '../../shared/store/auth/auth.feature';
import { getUserIdFromLocalStorage } from '../../shared/utils/get-user-id-from-local-storage.util';

@Component({
  selector: 'profile-page',
  templateUrl: './profile.html',
  imports: [LucideMail, LucidePhone, LucideUser, LucideMapPin],
})
export class ProfilePage implements OnInit {
  private readonly store = inject(Store);

  private readonly userId = toSignal(
    this.store.select(authFeature.selectUserId),
    { initialValue: null },
  );
  protected readonly user = toSignal(
    this.store.select(userFeature.selectUser),
    { initialValue: null },
  );
  protected readonly isLoading = toSignal(
    this.store.select(userFeature.selectIsLoading),
    { initialValue: false },
  );

  public ngOnInit(): void {
    // workaround for now
    // Todo: remove after implementing actions for restoring session
    const userId = this.userId() ?? getUserIdFromLocalStorage();
    const user = this.user();
    if (userId && !user) this.store.dispatch(userActions.load({ userId }));
  }
}
