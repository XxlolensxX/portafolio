const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    postcss = require('gulp-postcss'),
    cssnano = require('cssnano'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    liveReload = require('gulp-livereload'),
    concat = require('gulp-concat'),

    app_path = "./app";


//tareas de desarrollo

/*-------------------------------
/////////////SASS////////////////
-------------------------------*/
gulp.task('sass', ()=>
    gulp.src([
        './scss/*.scss',
        './scss/componentes/*scss'
    ])
        .pipe(sass({
            outputStyle :'expanded'
        }))
        .pipe(autoprefixer({
            versions: ['last 2 browsers']
        }))
        //.pipe(rename('./app/css/style.css'))
        .pipe(gulp.dest(app_path + '/css/'))
        
);//primer parametro nombre de la tarea, funcion con los otros metodos src o dest
/*-------------------------------
/////////////SASS////////////////
-------------------------------*/

/*-------------------------------
/////////BROWSER-SYNC////////////
-------------------------------*/
gulp.task('serve', ['sass'], () => {
    var archivos = [
        '../*.css',
        '../*.php',
        '../*.html'
    ];
// Servidor estático
    browserSync.init({
        server: {
            baseDir: "app"
        },
        port: 3001
    });
 // descomentar este bloque de código cuando se necesite trabajar con WordPress servidor dinámico
//inicializar BROWSER-SYNC 
   /* browserSync.init(archivos,{
        proxy: 'http://localhost:8888',
        notify: false
    }); */


gulp.watch(['./scss/**/**/*.{scss,css}'],['sass',reload]);
gulp.watch([app_path + '/*.html'],reload);
});
    

/*-------------------------------
/////////BROWSER-SYNC////////////
-------------------------------*/


//tareas de producción
gulp.task('postcss', function(){
    var processor = [
        cssnano
    ];

    gulp.src('./app/css/main.css')
        .pipe(postcss(processor))
        .pipe(gulp.dest('../'))
});



