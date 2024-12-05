import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { NO_ERRORS_SCHEMA ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
describe('LocalstorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
     schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getItem', () => {
    spyOn(service, 'getItem');
    service.getItem('key');
    expect(service.getItem).toHaveBeenCalled();
  });

  it('should call setItem', () => {
    spyOn(service, 'setItem');
    service.setItem('key', 'value');
    expect(service.setItem).toHaveBeenCalled();
  });

  it('should call clear', () => {
    spyOn(service, 'clear');
    service.clear();
    expect(service.clear).toHaveBeenCalled();
  });

  it('should call removeItem', () => {
    spyOn(service, 'removeItem');
    service.removeItem('key');
    expect(service.removeItem).toHaveBeenCalled();
  });
});
