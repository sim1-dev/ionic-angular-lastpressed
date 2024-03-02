import { Component, Input, OnInit } from '@angular/core';
import { AccountType } from 'src/app/models/account-types.model';
import { Settings } from 'src/app/models/settings.model';
import { LanguageService } from 'src/app/services/language.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  AccountType = AccountType

  @Input() public pageTitle: string = "Last Pressed";

  settings: Settings

  constructor(public storageService: StorageService, public languageService: LanguageService) { }

  async ngOnInit() {
    this.settings = await this.storageService.get()
  }

}
