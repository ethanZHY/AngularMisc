import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryService } from '../services/in-memory.service';

/**
 * @author Ethan Zhang
 * Only used for develop
 */
export const IN_MEMORY_WEB_API_MODULE = 
    HttpClientInMemoryWebApiModule.forRoot(
        InMemoryService, { dataEncapsulation: false }
    )