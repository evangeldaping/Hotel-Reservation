import { HttpEvent, HttpRequest, HttpResponse, HttpBackend } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

export class MockXHRBackend implements HttpBackend {
  private mediaItems = [
    {
      id: 1,
      name: 'Acura RSX',
      medium: 'SecondHand',     
      category: 'Acura',
      year: 2004,
      description: 'Acura Series',
      photoPath: 'https://st.motortrend.com/uploads/sites/10/2018/07/2019-acura-rdx-suv-angular-front.png'
    },
    {
      id: 2,
      name: 'BMW M4 Coupe',
      medium: 'BrandNew',    
      category: 'BMW',
      year: 2017,
      description: 'BMW Series',
      photoPath:'https://www.bmwusa.com/content/dam/bmwusa/XModels/Overview/2019/BMW-MY19-XSeries-Overview-Hero.png'
    }, 
    {
      id: 3,
      name: 'Mitsubishi Montero Sport',
      medium: 'BrandNew',
      category: 'Mitsubishi',
      year: 2010,
      description: 'Mitsubishi Series', 
      photoPath:'https://assets.newcars.com/images/pictures/VEHICLE/2020/Mitsubishi/Mitsubishi-Outlander-Sport-USD00MIS052A021001-E.png'
  
    }, 
    {
      id: 4,
      name: 'Toyota Camry 99',
      medium: 'SecondHand',
      category: 'Toyota',
      year: 2005,
      description: 'Toyota Series',
      photoPath:'http://3ge.shared.assets.s3.amazonaws.com/new-model-pages/toyota/2015/camry/15_camry-vehicle.png'
   
    }, 
    {
      id: 5,
      name: 'Honda CR-V',
      medium: 'SecondHand',    
      category: 'Honda',
      year: 2000,
      description: 'Honda Series',
      photoPath:'https://di-uploads-pod1.dealerinspire.com/rensselaerhonda/uploads/2018/05/2019-Honda-Odyssey-Model-Hero.png'
   
    }
  ];

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return new Observable((responseObserver: Observer<HttpResponse<any>>) => {
      let responseOptions;
      switch (request.method) {
        case 'GET':
          if (request.urlWithParams.indexOf('mediaitems?medium=') >= 0 || request.url === 'mediaitems') {
            let medium;
            if (request.urlWithParams.indexOf('?') >= 0) {
              medium = request.urlWithParams.split('=')[1];
              if (medium === 'undefined') { medium = ''; }
            }
            let mediaItems;
            if (medium) {
              mediaItems = this.mediaItems.filter(i => i.medium === medium);
            } else {
              mediaItems = this.mediaItems;
            }
            responseOptions = {
              body: {mediaItems: JSON.parse(JSON.stringify(mediaItems))},
              status: 200
            };
          } else {
            let mediaItems;
            const idToFind = parseInt(request.url.split('/')[1], 10);
            mediaItems = this.mediaItems.filter(i => i.id === idToFind);
            responseOptions = {
              body: JSON.parse(JSON.stringify(mediaItems[0])),
              status: 200
            };
          }
          break;
        case 'POST':
          const mediaItem = request.body;
          mediaItem.id = this._getNewId();
          this.mediaItems.push(mediaItem);
          responseOptions = {status: 201};
          break;
        case 'DELETE':
          const id = parseInt(request.url.split('/')[1], 10);
          this._deleteMediaItem(id);
          responseOptions = {status: 200};
      }

      const responseObject = new HttpResponse(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => {
      };
    });
  }

  _deleteMediaItem(id) {
    const mediaItem = this.mediaItems.find(i => i.id === id);
    const index = this.mediaItems.indexOf(mediaItem);
    if (index >= 0) {
      this.mediaItems.splice(index, 1);
    }
  }

  _getNewId() {
    if (this.mediaItems.length > 0) {
      return Math.max.apply(Math, this.mediaItems.map(mediaItem => mediaItem.id)) + 1;
    } else {
      return 1;
    }
  }
}
