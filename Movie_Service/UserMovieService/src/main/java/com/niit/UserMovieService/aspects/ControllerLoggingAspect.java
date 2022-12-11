package com.niit.UserMovieService.aspects;



import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class ControllerLoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(ControllerLoggingAspect.class);

    @Pointcut("execution(* com.niit.UserMovieService.controller..*(..))")
    public void controlMethod() {
    }


    @Before("controlMethod()")
    public void beforeAdvice(JoinPoint joinPoint){
        logger.info("-----Before Controller Method-----");
        logger.debug("Method name ::" +  joinPoint.getSignature().getName());
        logger.debug("Args ::" + Arrays.toString(joinPoint.getArgs()));
        logger.info("--------############----------");
    }

    @After("controlMethod()")
    public void afterAdvice(JoinPoint joinPoint){
        logger.info("-----After Controller Method----");
        logger.debug("Method name ::" +  joinPoint.getSignature().getName());
        logger.debug("Args ::" + Arrays.toString(joinPoint.getArgs()));
        logger.info("--------#################--------");
    }

    @AfterReturning(value = "controlMethod()",returning = "result")
    public void afterReturnAdvice(JoinPoint joinPoint, Object result){
        logger.info("----After Returning Controller Method----");
        logger.debug("Method name ::" +  joinPoint.getSignature().getName());
        logger.debug("Args ::" + Arrays.toString(joinPoint.getArgs()));
        logger.debug("Result ::"+result);
        logger.info("---#############--");
    }

    @AfterThrowing(value = "controlMethod()",throwing = "error")
    public void afterThrowing(JoinPoint joinPoint,Throwable error){
        logger.info("----After Throwing Exception by Controller Method----");
        logger.debug("Method name ::" +  joinPoint.getSignature().getName());
        logger.debug("Args ::" + Arrays.toString(joinPoint.getArgs()));
        logger.debug("Exception Message ::"+error);
        logger.info("---#############--");
    }
}



