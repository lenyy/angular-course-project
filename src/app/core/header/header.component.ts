import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [DataStorageService]
})
export class HeaderComponent implements OnInit {
    @Output() featureSelected = new EventEmitter<string>();

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

    ngOnInit() {
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.getRecipes();
    }

    onLogout() {
        this.authService.logout();
    }

    isAuthenticated() {
        return this.authService.isAuthenticated();
    }
}
