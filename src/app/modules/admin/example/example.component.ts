import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { DataService } from 'app/core/services/data.service';

@Component({
    selector     : 'example',
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent 
{
    /**
     * Constructor
     */
    constructor(
        private dataService: DataService)
    {
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.dataService.getData().subscribe(data => {
            console.log(data)
        })
    }
}
